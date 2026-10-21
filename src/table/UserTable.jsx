import { useTranslation } from 'react-i18next';

export default function UserTable({users}) {
  const { t } = useTranslation('usertable');
  return (
    <table align='center'>
      <thead>
        <tr>
          <th scope="col">{t('name')}</th>
          <th scope="col">{t('email')}</th>
          <th scope="col">{t('age')}</th>
          <th scope="col">{t('location')}</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.email}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.age}</td>
            <td>{user.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
