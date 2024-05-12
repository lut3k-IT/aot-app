const ColorTest = () => {
  return (
    <div className={'flex flex-col gap-4 bg-black p-12 text-4xl font-bold'}>
      <div className={'bg-background text-foreground'}>bg foreg</div>
      <div className={'bg-accent text-accent-foreground'}>accent</div>
      <div className={'bg-card text-card-foreground'}>card</div>
      <div className={'bg-popover text-popover-foreground'}>popover</div>
      <div className={'bg-muted text-muted-foreground'}>muted</div>
      <div className={'bg-muted2 text-muted2-foreground'}>muted 2</div>
      <div className={'bg-primary text-primary-foreground'}>primary</div>
      <div className={'bg-destructive text-destructive-foreground'}>destructive</div>
    </div>
  );
};

export default ColorTest;
