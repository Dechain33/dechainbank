import React from 'react';
import {Progress} from "@/components/ui/progress.jsx";

const PoolProgressbar = ({title, range, numberOne, numberTwo}) => {
    const [progress, setProgress] = React.useState(0)

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(range), 500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="mt-5 first:mt-0">
            <div className="text-center text-md">
                {title}
            </div>
            <div className="sm:flex sm:justify-center">
                <Progress value={progress} className="w-[100%] sm:w-[60%] my-2" indicatorColor='bg-[#60D937]'/>
            </div>
            <div className="text-center text-lg font-medium">
                {numberOne} / {numberTwo}
            </div>

        </div>
    );
};

export default PoolProgressbar;