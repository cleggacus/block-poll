import Entry from '../components/entry';
import Link from 'next/link';

export default () => {
  return(
    <Entry>
      <h1>Welcome back</h1>
      <input placeholder="Username"></input>
      <input type="password" placeholder="Password"></input>
      <input type="button" value="Login"></input>
      <Link href="register"><span>Need an account? <a>Register</a></span></Link>
    </Entry>
  )
}