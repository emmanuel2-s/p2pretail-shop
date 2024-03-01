

export function ModuleNoGenerator (businessName) {
    const subBusinessName = businessName.toUpperCase().substring(0, 2);
    // const subModulenName = moduleName.toUpperCase().substring(0, 2);
  
    return subBusinessName + '-' + generateUniqueCode();
  
  };


  const generateUniqueCode = () => {
    return (Math.floor(Math.random() * (9000000)) + 1000000).toString();
};