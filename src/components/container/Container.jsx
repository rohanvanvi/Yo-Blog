function Container({ children, className = "", noPadding = false }) {
  return (
    <div
      className={`
        w-full max-w-7xl mx-auto 
        ${noPadding ? "" : "px-4 sm:px-6 lg:px-8"}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Container;
