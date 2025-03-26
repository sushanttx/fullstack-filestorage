import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import {getCustomers, login as performLogin} from "../../services/client.js";
import jwtDecode from "jwt-decode";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {

    const [customer, setCustomer] = useState(null);

    const setCustomerFromToken = async () => {
        let token = localStorage.getItem("access_token");
        if (token) {
            token = jwtDecode(token);
            try {
                console.log("token sub: ",token.sub);
                const response = await getCustomers(token.sub);
                console.log("Fetched customer details:", response);
                const loggedInCustomer = response.data.find(cust => cust.email === token.sub);
                console.log("loggedInCustomer", loggedInCustomer);
                setCustomer({
                    username: token.sub,
                    roles: token.scopes,
                    customerId: loggedInCustomer.id, // Ensure this API returns customerId
                });
            } catch (error) {
                console.error("Error fetching customer details:", error);
            }
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            await setCustomerFromToken(); // ✅ Call async function inside
        };
        fetchData();
    }, [])


    const login = async (usernameAndPassword) => {
        return new Promise((resolve, reject) => {
            performLogin(usernameAndPassword).then(async res => {
                const jwtToken = res.headers["authorization"];
                localStorage.setItem("access_token", jwtToken);

                const decodedToken = jwtDecode(jwtToken);

                try {
                    // Fetch customer details after login
                    const response = await getCustomers(decodedToken.sub);
                    const loggedInCustomer = response.data.find(cust => cust.email === token.sub);
                    setCustomer({
                        username: decodedToken.sub,
                        roles: decodedToken.scopes,
                        customerId: loggedInCustomer.id, // Ensure this is correctly fetched
                    });
                } catch (error) {
                    console.error("Error fetching customer details:", error);
                }

                resolve(res);
            }).catch(err => {
                reject(err);
            });
        })
    }

    const logOut = () => {
        localStorage.removeItem("access_token")
        setCustomer(null)
    }

    const isCustomerAuthenticated = () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            return false;
        }
        const { exp: expiration } = jwtDecode(token);
        if (Date.now() > expiration * 1000) {
            logOut()
            return false;
        }
        return true;
    }

    return (
        <AuthContext.Provider value={{
            customer,
            login,
            logOut,
            isCustomerAuthenticated,
            setCustomerFromToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;