type TerminalData = {
    subheading: string;
    data: string;
};

type props = {heading: string; info: TerminalData[];};

export default function Terminal({heading, info}: props){
    return(
        <div className="bg-black p-4 m-4">
            <h1 className="text-xl pb-3">{heading}</h1>

            {info.map(item => (
                <div key={item.subheading}>
                    <h2 className="font-bold">{item.subheading}:</h2>
                    <p>{item.data}</p>
                </div>
            ))}
        </div>
    )
}