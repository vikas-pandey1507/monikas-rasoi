
export function Input(props){
  return <input {...props} className={`w-full h-10 px-3 rounded-lg border focus:ring-2 focus:ring-black/10 ${props.className||''}`} />
}
