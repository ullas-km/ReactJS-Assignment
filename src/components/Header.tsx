type HeaderProps = Readonly<{
  name: string;
}>;

export default function Header({
  name
}: HeaderProps) {

  return (

    <div className="dashboard-header">

      <h1>
        Welcome {name}
      </h1>

    </div>
  );
} 