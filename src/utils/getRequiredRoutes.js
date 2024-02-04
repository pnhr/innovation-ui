export const getRequiredRoutes = (props, isAuthenticated, isMenu = false) => {
    
    const routesArr = Array.from(props);
    let filteredRoutes = []
    routesArr.forEach(item => {
        if (!item.isProtected || (item.isProtected && isAuthenticated)) {
            if (!isMenu || (isMenu && item.isMenuItem))
                    filteredRoutes.push(item);
        }
    });

    return filteredRoutes;
}
