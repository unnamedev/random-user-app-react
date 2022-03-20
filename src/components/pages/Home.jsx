import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import moment from "moment"
// slice
import {getData} from "../../features/user/userSlice"
// component
import {Loader} from "../index"
// icons
import {RiLockPasswordLine, RiUser3Fill} from "react-icons/ri"
import {MdAlternateEmail} from "react-icons/md"
import {BsCalendar3, BsPhone} from "react-icons/bs"
import {FaStreetView} from "react-icons/fa"

/**
 * @description - Home Page Component
 * @returns {JSX.Element}
 * @constructor
 */
const Home = () => {
    // This is a way to get the data from the redux store.
    const dispatch = useDispatch()
    // This is a way to get the data from the redux store.
    const {data, isLoading, isError} = useSelector(({user}) => user)
    const [about, setAbout] = useState(null)

    // Get user data
    useEffect(() => {
        dispatch(getData())
    }, [])

    // Set default values
    useEffect(() => {
        if (data) {
            setAbout({
                name: "name",
                value: user.name
            })
        }
    }, [data])

    // Create user object
    const user = data.length !== 0 && {
        image: data.picture && data.picture.large || data.picture.medium,
        name: `${data.name.first} ${data.name.last}`,
        email: data.email,
        birthday: `${moment(data.dob.date).format("L")}`,
        address: `${data.location.street.number} ${data.location.street.name}`,
        phone: data.cell,
        login: data.login.password,
    }

    // This is a way to show a loader when the data is loading.
    if (isError) return <Loader error/>
    // This is a way to show a loader when the data is loading.
    if (isLoading) return <Loader/>

    // Set values after mouse over
    const onMouseOver = (e) => {
        setAbout({
            name: e.target.dataset.name,
            value: e.target.dataset.value
        })
    }

    return <div
        className="flex flex-col items-center max-w-2xl w-full m-auto bg-white rounded-lg shadow mt-2 p-4 gap-1 md:p-6 dark:bg-primary dark:text-secondary">
        {user && <>
            {/* Avatar */}
            <div
                className="w-[100px] m-auto rounded-[50%] border-4 border-blue-400 md:w-[200px] md:h-[200px] overflow-hidden mb-2">
                <img className="w-full object-cover" src={user.image} alt={user.name}/>
            </div>

            {/* Titles */}
            {about !== null && <>
                <p className="text-gray-500 dark:text-accent font-semibold">My {about.name} is</p>
                <p className="font-semibold text-xl mb-2">{about.value}</p>
            </>}

            {/* Information */}
            <div className="flex gap-4 mb-4">
                {Object.entries(user).map((o, idx) =>
                    <div
                        key={idx}
                        className="group hover:text-blue-500 transition-all cursor-pointer dark:hover:text-accent"
                        data-name={o[0]}
                        data-value={o[1]}
                        onMouseOver={onMouseOver}
                    >
                        <div className="pointer-events-none">
                            {o[0] === "name" && <RiUser3Fill className="group-hover:transition-all" size={30}/>}
                            {o[0] === "email" &&
                                <MdAlternateEmail className="group-hover:transition-all" size={30}/>}
                            {o[0] === "birthday" && <BsCalendar3 className="group-hover:transition-all" size={30}/>}
                            {o[0] === "address" && <FaStreetView className="group-hover:transition-all" size={30}/>}
                            {o[0] === "phone" && <BsPhone className="group-hover:transition-all" size={30}/>}
                            {o[0] === "login" &&
                                <RiLockPasswordLine className="group-hover:transition-all" size={30}/>}
                        </div>
                    </div>
                )}
            </div>

            {/* Update */}
            <button
                className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center focus:outline-none focus:shadow-outline transition-all"
                disabled={isLoading}
                onClick={() => dispatch(getData())}
            >Update
            </button>
        </>
        }
    </div>
}

export default Home
