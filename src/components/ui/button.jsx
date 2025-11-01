
import React from 'react'
export function Button({ asChild, children, className='', variant='default', size='md', ...props }){
  const base = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none'
  const variants = {
    default: 'bg-black text-white hover:bg-black/90',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-black',
    outline: 'border border-gray-300 hover:bg-gray-50'
  }
  const sizes = { sm:'h-9 px-3 rounded-lg text-sm', md:'h-10 px-4 rounded-xl', lg:'h-14 px-6 rounded-2xl text-lg' }
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  if(asChild) return React.cloneElement(React.Children.only(children), { className: `${children.props.className||''} ${cls}` })
  return <button className={cls} {...props}>{children}</button>
}
