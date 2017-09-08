const isArray = (data) => {
    return (Object.prototype.toString.call(data) === '[object Array]');
  };

export { isArray };
