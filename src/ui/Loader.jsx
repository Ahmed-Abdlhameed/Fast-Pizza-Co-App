function Loader() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-200/20 backdrop-blur-xs">
      <div className="loader"></div>
    </div>
  );
}

/* 
  - inset-0: top: 0; right: 0; bottom: 0; left: 0;
  - bg-slate-200/20: background-color: rgba(226, 232, 240, 0.2); // opacity-20
  - backdrop-blur-xs: backdrop-filter: blur(4px);
*/

export default Loader;
