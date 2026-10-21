import { useTranslation } from "react-i18next"
import UserTable from "./table/UserTable"

function App() {
   const { t, i18n } = useTranslation('usertable')
   const users = [
    {name:'John Doe',email:"johndoe@example.com",age:30,location:'New York'},
    {name:'Jane Smith',email:'janesmith@example.com',age:28,location:'London'},
    {name:'Michael Johnson',email:'michaeljohnson@example.com',age:35,location:'Berlin'}
   ]
  return (
    <div className="App">
     <h1>{t('title')}</h1>
     <label htmlFor="language">{t('language')}: </label>
     <select
       id="language"
       value={i18n.resolvedLanguage || 'tr'}
       onChange={(event) => i18n.changeLanguage(event.target.value)}
     >
       <option value="tr">Türkçe</option>
       <option value="en">English</option>
     </select>
     <UserTable users={users}/>
    </div>
  )
}

export default App
