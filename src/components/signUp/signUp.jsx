export default function SignUpPage() {
  return (
    <>
      <h3>Registration</h3>
      <form action="submit">
        <h4>name</h4>
        <input type="name" />
        <h4>email</h4>
        <input type="email" />
        <h4>password</h4>
        <input type="text" />
      </form>
      <button type="submit">registration</button>
    </>
  );
}
