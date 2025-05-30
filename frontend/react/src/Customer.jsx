import {
    Wrap,
    WrapItem,
    Spinner,
    Text
} from '@chakra-ui/react';
import SidebarWithHeader from "./components/shared/SideBar.jsx";
import { useEffect, useState } from 'react';
import { getCustomers } from "./services/client.js";
import CardWithImage from "./components/customer/CustomerCard.jsx";
import CreateCustomerDrawer from "./components/customer/CreateCustomerDrawer.jsx";
import {errorNotification} from "./services/notification.js";
import jwtDecode from "jwt-decode"; // Install using: npm install jwt-decode

const getLoggedInUserId = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return null;
    try {
        const decoded = jwtDecode(token);
        const response = await getCustomers(decoded.sub);
        const loggedInCustomer = response.data.find(cust => cust.email === decoded.sub);
        console.log("getLoggedInUserId: ", loggedInCustomer.id);
        return loggedInCustomer.id; // Ensure your JWT includes "id"
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};

const Customer = () => {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setError] = useState("");

    const fetchCustomers = () => {
        setLoading(true);
        getCustomers().then(res => {
            setCustomers(res.data)
        }).catch(err => {
            setError(err.response.data.message)
            errorNotification(
                err.code,
                err.response.data.message
            )
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchCustomers();
    }, [])

    if (loading) {
        return (
            <SidebarWithHeader>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </SidebarWithHeader>
        )
    }

    if (err) {
        return (
            <SidebarWithHeader>
                <CreateCustomerDrawer
                    fetchCustomers={fetchCustomers}
                />
                <Text mt={5}>Ooops there was an error</Text>
            </SidebarWithHeader>
        )
    }

    if(customers.length <= 0) {
        return (
            <SidebarWithHeader>
                <CreateCustomerDrawer
                    fetchCustomers={fetchCustomers}
                />
                <Text mt={5}>No customers available</Text>
            </SidebarWithHeader>
        )
    }

//     const loggedInCustomerId = getLoggedInUserId();

    return (
        <SidebarWithHeader customerId={getLoggedInUserId}>
            <CreateCustomerDrawer fetchCustomers={fetchCustomers} />
            <Wrap justify={"center"} spacing={"30px"}>
                {customers.map((customer, index) => (
                    <WrapItem key={index}>
                        <CardWithImage
                            {...customer}
                            imageNumber={index}
                            fetchCustomers={fetchCustomers}
                        />
                    </WrapItem>
                ))}
            </Wrap>
        </SidebarWithHeader>
//     );
//
//
//     return (
//         <SidebarWithHeader customerId={customers.length > 0 ? customers[0].id : null}>
//             <CreateCustomerDrawer
//                 fetchCustomers={fetchCustomers}
//             />
//             <Wrap justify={"center"} spacing={"30px"}>
//                 {customers.map((customer, index) => (
//                     <WrapItem key={index}>
//                         <CardWithImage
//                             {...customer}
//                             imageNumber={index}
//                             fetchCustomers={fetchCustomers}
//                         />
//                     </WrapItem>
//                 ))}
//             </Wrap>
//         </SidebarWithHeader>
    )
}

export default Customer;