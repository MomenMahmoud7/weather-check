const Loading = () => {
  return (
    <div className="flex gap-1 h-16" data-testid="loading">
      <div className="flex items-center animate-bounce [animation-delay:100ms] w-2">
        <div className="h-2 w-2 bg-black"></div>
      </div>
      <div className="flex items-center animate-bounce [animation-delay:200ms] w-2">
        <div className="h-2 w-2 bg-black"></div>
      </div>
      <div className="flex items-center animate-bounce [animation-delay:300ms] w-2">
        <div className="h-2 w-2 bg-black"></div>
      </div>
    </div>
  );
};

export default Loading;
