import Entry from '../components/entry';
import Link from 'next/link';

export default () => {
  return(
    <Entry>
      <h1>New Account</h1>
      <input placeholder="Username"></input>
      <input type="password" placeholder="Password"></input>
      <input type="password" placeholder="Repeat Password"></input>
      <input type="button" value="Register"></input>
      <Link href="/login"><span>Have an account? <a>Login</a></span></Link>
    </Entry>
  )
}