export const filterByDesignation = async (field, data) => {
    if(field.length>0){
        const filteredData = await data.filter(item => {
            return item.affectedLines.some(line => {
                return line.designation === field;
            });
        }); 
        return filteredData
    }else{
        return data;
    }
};

export const filterByStopPointName = async (field, data) => {
    
    if(field.length>0){
        const filteredData = await data.filter(item => {
            return item.affectedStopPoints.some(point => {
                return point.name === field;
            });
        }); 
        return filteredData
    }else{
        return data;
    }
};

export const filterByMunicipality = async (field, data) => {

    if(field.length>0){
        const filteredData = await data.filter(item => {
            return item.affectedStopPoints.some(point => {
                return point.municipalityName === field;
            });
        }); 
        return filteredData
    }else{
        return data;
    }
};

export const filterBySelectedMode = async (field, data) => {
    const today = new Date();

    if(field==="ongoing"){
        const todayData = data.filter((d) => {
            const startTime = new Date(d.startTime);
            return (
                startTime.getDate() === today.getDate()
            );
        });
 
        return todayData
    }else{

        const futureData = data.filter((d) => {
            const startTime = new Date(d.startTime);
            return (
                startTime.getDate() !== today.getDate()
            );
        });

        return futureData
    }
}


export const filterByText = async (queries, data) => {
    
     if(queries.designation.length>0 || queries.stopPointName.length>0|| queries.municipality.length>0 || queries.selectedMode){
        const designatedData = await filterByDesignation(queries.designation, data);
        const stopPointData = await filterByStopPointName(queries.stopPointName, designatedData);
        const municipalityData = await filterByMunicipality(queries.municipality, stopPointData);
        const selectedModeData = await filterBySelectedMode(queries.selectedMode, municipalityData);
        
        return selectedModeData;
    }else{
        return data
    }   

}

export const filterByMode = async (modes, data) =>{
    if(modes.bus || modes.tram || modes.train || modes.boat){
        const filterByMode = await data.filter(item =>
            item.affectedLines.some(line =>
                Object.keys(modes)
                    .filter(key => modes[key])
                        .includes(line.defaultTransportModeCode)
            )
        );
        return filterByMode;
    }else{
        return data
    }
}


