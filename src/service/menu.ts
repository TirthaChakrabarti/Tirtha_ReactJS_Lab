import axios from "axios"
import IDataList from "../model/IDataList"

const getDataFromServer = () => {
    return axios.get<IDataList[]>('http://localhost:3001/items')
        .then(response => response.data)
}

const pushDataIntoServer = (newItem : Omit<IDataList, 'id'>) => {
    return axios.post<IDataList>('http://localhost:3001/items', 
                    newItem, {
                        headers: {
                            "Content-Type": "application/json"
                        }
    })
    .then(Response => Response.data)
}

export {
    getDataFromServer, 
    pushDataIntoServer
}