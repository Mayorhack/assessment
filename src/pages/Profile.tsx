import { useEffect, useReducer } from "react";
import Card from "../components/Card";
import Logo from "../components/Logo";
import Timer from "../components/Timer";
interface Response {
  ceo: string;
  cto: string;
  name: string;
}
type Action =
  | { type: "LOAD_STATE"; payload: { loading: boolean } }
  | { type: "FETCH_DATA"; payload: { response: Response; loading: boolean } }
  | { type: "FETCH_ERROR"; payload: { error: string; loading: boolean } };
type State = {
  response: Response | null;
  error: string;
  loading: boolean;
};
const fetchReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "LOAD_STATE":
      return { ...state, ...action.payload };
    case "FETCH_DATA":
      return { ...state, ...action.payload };
    case "FETCH_ERROR":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
const initialState = { response: null, error: "", loading: false };
const Profile = () => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const fetchData = async () => {
    try {
      dispatch({ type: "LOAD_STATE", payload: { loading: true } });
      const response = await fetch(
        "https://spacex-production.up.railway.app/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `query Company {
          company {
            ceo
            cto
            name
          }
        }`,
          }),
        }
      )
        .then((resp) => resp.json())
        .then((data) => data);
      if (response) {
        dispatch({
          type: "FETCH_DATA",
          payload: { response: response.data.company, loading: false },
        });
      } else {
        throw new Error("");
      }
    } catch (error: any) {
      dispatch({
        type: "FETCH_ERROR",
        payload: { error: error.message, loading: false },
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="profile">
      <nav>
        <Logo />
        <p className="flex" style={{ textAlign: "right" }}>
          User will be logged out in: <Timer />
        </p>
      </nav>
      <div className="flex profile_flex">
        <div className="company_info">
          <Card variant="outlined" borderRadius="8px">
            {!state.loading ? (
              <div className="company_info">
                <div className=" flex" style={{ marginBottom: "4.4rem" }}>
                  <div className="company_logo">{state.response?.name[0]}</div>
                  <h2>{state.response?.name}</h2>
                </div>

                <div className="ceo">
                  <p>CEO</p>
                  <p className="name">{state.response?.ceo}</p>
                </div>
                <div className="ceo">
                  <p>CTO</p>
                  <p className="name">{state.response?.cto}</p>
                </div>
              </div>
            ) : (
              <div className="loader"></div>
            )}
          </Card>
        </div>
        <aside className="">
          <Card variant="contained" borderRadius="12px">
            <>
              <p className="coming_soon flex">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 18.9583C5.63334 18.9583 2.08334 15.4083 2.08334 11.0417C2.08334 6.675 5.63334 3.125 10 3.125C14.3667 3.125 17.9167 6.675 17.9167 11.0417C17.9167 15.4083 14.3667 18.9583 10 18.9583ZM10 4.375C6.32501 4.375 3.33334 7.36667 3.33334 11.0417C3.33334 14.7167 6.32501 17.7083 10 17.7083C13.675 17.7083 16.6667 14.7167 16.6667 11.0417C16.6667 7.36667 13.675 4.375 10 4.375Z"
                    fill="#E60A2B"
                  />
                  <path
                    d="M10 11.4584C9.65833 11.4584 9.375 11.175 9.375 10.8334V6.66669C9.375 6.32502 9.65833 6.04169 10 6.04169C10.3417 6.04169 10.625 6.32502 10.625 6.66669V10.8334C10.625 11.175 10.3417 11.4584 10 11.4584Z"
                    fill="#E60A2B"
                  />
                  <path
                    d="M12.5 2.29169H7.5C7.15833 2.29169 6.875 2.00835 6.875 1.66669C6.875 1.32502 7.15833 1.04169 7.5 1.04169H12.5C12.8417 1.04169 13.125 1.32502 13.125 1.66669C13.125 2.00835 12.8417 2.29169 12.5 2.29169Z"
                    fill="#E60A2B"
                  />
                </svg>
                Coming soon
              </p>
              <Card variant="outlined" borderRadius="10px">
                <>
                  <div className="grid">
                    <p className="flex">🎉</p>
                    <div></div>
                  </div>
                  <div className="grid">
                    <p className="flex">✨</p>
                    <div></div>
                  </div>
                  <div className="grid">
                    <p className="flex">💥</p>
                    <div></div>
                  </div>
                </>
              </Card>
              <h2>📫 Notifications</h2>
              <p className="notification_text">
                Receive notifcations about your rider performance, efficiency
                reviews and a lot more
              </p>
            </>
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default Profile;
