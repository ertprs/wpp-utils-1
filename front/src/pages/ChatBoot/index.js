import React, { useState } from 'react'

import DashboardChatBoot from '../../components/DashboardChatBoot/index'
import FormNewRule from '../../components/FormNewRule/index'

const Home = () => {
    let [display, setDisplay] = useState(1)
    
    return (
        <>
            { display === 1 ? <DashboardChatBoot toggleDisplay={()=>setDisplay(2)} /> : <FormNewRule toggleDisplay={()=>setDisplay(1)}/> }
        </>
    )
}

export default Home;