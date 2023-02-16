import React , {useState,useEffect} from 'react';
import './TodoList.css';


// Get the local storage data
   const getLocalData = () => {
    const lists = localStorage.getItem("todolist");
    if(lists) {
      return JSON.parse(lists);
    }
    return [];
  };

const Todo = () => {
  const [inputdata,setInputdata] = useState("");
  const [items,setItemdata] = useState(getLocalData());
const [ editdata,seteditData] = useState("");
const [ toggleedit,settoggleEdit]=useState(false);
  // Add the Items in todo list
  const addItem = () => {
      if(!inputdata) {
        alert('plz fill the data');
      }
      else if(inputdata && toggleedit) {
        setItemdata(items.map((curEle)=>{
          if(curEle.id===editdata) {
            return{...curEle,name:inputdata}
          }
          return curEle;
        }))
    setInputdata("")
    seteditData(null);
    settoggleEdit(false);
      }

      else {
        const myNewInput = {
          id:new Date().getTime().toString(),
          name:inputdata
        }
        setItemdata([...items,myNewInput])
        setInputdata("");
      }
   }

   // Delete the data
   const deleteItem = (uniqueId) => {
    const result = items.filter((curEl)=>{
      return curEl.id !== uniqueId
    });
    return setItemdata(result);
   }

   //Edit the data
   const editItem = (uniqueId) => {
   const editItemData = items.find((cur)=>{
      return cur.id === uniqueId;
    })
    setInputdata(editItemData.name)
    seteditData(uniqueId);
    settoggleEdit(true);
   }

   // Data save in Local Storage using useeffect
   useEffect(()=>{
     localStorage.setItem("todolist",JSON.stringify(items))
   },[items]);//dependency on items array.

  return (
  <>
  <div className="main-div">
    <div className="child-div">
      <figure>
        <img src="https://media.istockphoto.com/vectors/todolist-symbol-drawing-vector-id1160167482" alt="tododlist"/>
          <figcaption>
          Add Your List Here ✌
          </figcaption>
        </figure>
        <div className="addItems">
          <input type="text" placeholder="🤏Add Items" className="form-control" value={inputdata} onChange={(e)=>setInputdata(e.target.value)}/>
          {toggleedit ? <i className="far fa-edit edit-btn" onClick={addItem}></i>:<i className="fa fa-plus add-btn" onClick={addItem}></i>}

        </div>
            {/*shpw all items */}
            <div className="showItems">
            {items.map((curElem,index)=>{
              return (
                <div className="eachItem" key={index}>
                <div className="todo-btn">
                      <div className="data">{curElem.name}</div>

                    <div><i className="far fa-edit add-btn" onClick={()=>editItem(curElem.id)}></i></div>
                      <div><i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(curElem.id)}></i></div>
                </div>
                </div>
              )
            })}

            </div>
            {/*remove all items*/ }
        <div className="button-div">
          <button onClick={()=>setItemdata([])} className="checklist-CTA"/>
        </div>
   </div>
  </div>
  </>
  )
}

export default Todo;
