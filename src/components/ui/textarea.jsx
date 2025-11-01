
export function Textarea(props){
  return <textarea {...props} className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-black/10 ${props.className||''}`}></textarea>
}
