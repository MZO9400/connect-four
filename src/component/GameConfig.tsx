import Color from "../types/Color"

interface AskColorProps {
    setColor: Function
    withAI: Function
}

const GameConfig = ({setColor, withAI}: AskColorProps) => {
    return (
        <div className="animate-fade h-screen flex flex-col justify-center items-center">
            <h3 className="mt-8 mb-5 text-lg font-medium text-gray-900">Game configuration</h3>
            <ul className="grid w-full gap-6 md:grid-cols-2">
                <li className="justify-self-center" onClick={() => setColor(Color.RED)}>
                    <label className="inline-flex items-center bg-red-700 hover:bg-red-900 justify-between p-5 text-gray-500 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600">
                        <div className="block">
                            <div className="w-full text-lg font-semibold text-gray-200">Red</div>
                        </div>
                        <svg className="w-5 h-5 ms-3 rtl:rotate-180 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </label>
                </li>
                <li className="justify-self-center" onClick={() => setColor(Color.YELLOW)}>
                <label className="inline-flex items-center bg-yellow-300 hover:bg-yellow-700 hover:text-gray-200 justify-between p-5 text-gray-500 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">Yellow</div>
                        </div>
                        <svg className="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </label>
                </li>
            </ul>
            <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                    <input
                    id="comments"
                    name="comments"
                    type="checkbox"
                    aria-describedby="comments-description"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    onClick={() => withAI((value: boolean) => !value)}
                    />
                </div>
                <div className="ml-3 text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                        Play against AI
                    </label>
                </div>
            </div>
        </div>
    )
}

export default GameConfig