
const Choise=(props) =>{
    return (
      <a
      className="bg-slate-200  ring-1 ring-black font-semibold flex justify-between items-center py-2 px-4 text-left rounded-md hover:bg-blue-300 transition duration-300 ease-in-out transform hover:scale-105"
      href={props.href}
    >
      ➛ {props.children}
    </a>
    )
  }
export default Choise;  