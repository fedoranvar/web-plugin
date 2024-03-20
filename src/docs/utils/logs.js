function try_catch(func) {
  try {
     func()
  } catch (error) {
    console.log('error :>> ', error);
  }
}
