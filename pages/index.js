import SignIn from "../components/signin";

const styles = {
  container: `h-full w-full flex bg-[#fff]`,
};

export default function Home() {
  return (
    <div className={styles.container}>
      <SignIn />
    </div>
  );
}
