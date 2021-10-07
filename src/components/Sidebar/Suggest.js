import { useState, useEffect } from "react";
import { generateFileUrl } from "../../Utility/Util";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { listGroupsForAddPost } from "../../graphql-custom/group/queries";

export default function Suggest({title, className}) {
    const [groupData, setGroupData] = useState([]);
    const getGroups = async () => {
        try {
          let resp = await API.graphql(graphqlOperation(listGroupsForAddPost));
          setGroupData(resp.data.listGroups.items);
        } catch (ex) {
          console.log(ex);
        }
      };
    
      useEffect(() => {
        getGroups();
        // eslint-disable-next-line
      }, []);
    return (
        <div className="mt-c27">
                        <p className={`${className ? className : "text-17px font-bold text-caak-generalblack" }`}>{title}</p>
                        {groupData.map((item, index) => {
                    return (
                        <div
                            key={index}
                            // onClick={() => onSelect(item)}
                            className={"flex flex-col cursor-pointer w-max"}
                        >
                            <div
                                className={
                                    "flex flex-row items-center p-1.5 my-px rounded-square"
                                }
                            >
                                <img
                                    src={generateFileUrl(item.profile)}
                                    className={"w-8 h-8 rounded-md object-cover mr-2"}
                                    alt={""}
                                />
                                <span
                                    className={
                                        "text-caak-generalblack font-medium text-15px"
                                    }
                                >
                                    {item.name}
                                </span>
                            </div>
                        </div>
                    );
                })}
                    </div>
    )
}
