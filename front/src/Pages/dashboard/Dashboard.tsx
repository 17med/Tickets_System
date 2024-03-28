import { useSpring, animated } from 'react-spring';
const Dashboard = (props:any) => {
    document.title= "Dashboard";
    const animationProps = useSpring({
        opacity: 1,
        from: { opacity: 0 }, // Initial state, opacity is 0
        config: { duration: 500 } // Animation duration
    });

    return (
        <>
    <animated.div style={animationProps}>

        <div className="text-center text-3xl">Hello <b>{props.name}</b></div>
    </animated.div>
</>
    );
};

export default Dashboard;
