const Loading = () => {
  return (
    <div className="m-auto relative w-15 h-15">
        <div className="absolute w-15 h-15 bg-conic from-zinc-50 via-blue-200 to-blue-500 rounded-full animate-spin"></div>
        <div className="absolute w-11 h-11 bg-zinc-50 rounded-full top-1/2 left-1/2 -translate-1/2"></div>
    </div>
  )
}

export default Loading