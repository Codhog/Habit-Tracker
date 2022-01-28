import "antd/dist/antd.css";
import './App.css';
import Settings from "./Settings";
import {useState} from "react";
import SettingsContext from "./SettingsContext";
import Habits from "./components/Habits";

function App() {

    // Initial setting one descending clock
    const [data, setData] = useState([{
        'type':"time-descend",
                     "name":"custom text",
                        "value": 30
            }])
    const [settings, showSettings] = useState(false)
    // 两个主要的状态 工作时间 休息时间 被提升到App首页
    //{habits: [{'type':time-ascend,
    //          "name":"custom text",
    //             "value": Integer
    // }]
    //
    return (
        <main>

            <SettingsContext.Provider value={{
                data,
                setData,
            }}>
                {settings ? <Settings /> : <Habits />}
            </SettingsContext.Provider>
        </main>
    );
}

export default App;
