
export function Badge({ children, variant='default', className='' }){
  const variants = {
    default: 'bg-black text-white',
    secondary: 'bg-gray-100 text-black',
    outline: 'border border-gray-300 text-black'
  }
  return <span className={`inline-flex items-center px-2.5 py-1 text-xs rounded-full ${variants[variant]} ${className}`}>{children}</span>
}
