function SpeechBubble({ text, show = true }) {
  return (
    <div className="relative h-[160px]">
      {show && (
        <div className="absolute top-0 left-[220px] w-[340px] bg-gray-100 rounded-lg shadow-md border border-[#6a512d] px-5 py-3 leading-snug text-black tracking-wider text-lg pointer-events-none">
          <p className="break-words">{text}</p>
          <div className="absolute -left-4 top-4 w-0 h-0 border-t-[10px] border-t-transparent border-r-[16px] border-r-[#6a512d] border-b-[10px] border-b-transparent" />
        </div>
      )}
    </div>
  )
}

export default SpeechBubble
