import React from "react";
import "./Table.css";
import "antd/dist/antd.css";
import { Table, Input, Button, Modal } from "antd";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function Tabledetails() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(3);
  const [page, setPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  useEffect(() => {
    getUser();
  }, []);
  let { uid } = useParams();
  //getting associate task w r t uid
  function getUser() {
    setLoading(true);
    fetch(`http://localhost:3001/tasks/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDataSource(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  //deleting task w r t taskid
  function deleteTask(taskid) {
    fetch(`http://localhost:3001/tasks/${taskid}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        getUser();
      });
    });
  }
  //update task w r t taskid

  function editTask(record2) {
    setIsEditing(true);
    setEditingTask({ ...record2, taskid: record2.taskid });
  }
  const resetEditing = () => {
    setIsEditing(false);
    setEditingTask(null);
  };

 
  // fn for updating

const update=()=>{
  setDataSource((edit) => {
    return edit.map((task) => {
      if (task.taskid === editingTask.taskid) {
        return editingTask;
      } else {
        return task;
      }
    });
  });
  resetEditing();
}
  const columns = [
    {
      key: "1",
      title: "Task Name",
      dataIndex: "taskname",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder='Type text here'
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type='primary'>
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type='danger'>
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.taskname.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      key: "2",
      title: "Task ID",
      dataIndex: "taskid",
    },
    {
      key: "3",
      title: "Task Description",
      dataIndex: "taskdescription",
    },

    {
      key: "4",
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "New",
          value: "New",
        },
        {
          text: "Completed",
          value: "Completed",
        },
        {
          text: "In Progress",
          value: "In Progress",
        },
      ],
      onFilter: (value, record1) => record1.status.toLowerCase().indexOf(value.toLowerCase()) === 0,
    },
   
    {
      key: "5",
      title: "Approval",
      dataIndex: "approval",
      filters: [
        {
          text: "Approved",
          value: "Approved",
        },
        {
          text: "Not Approved",
          value: "Not Approved",
        },
      ],
    
      onFilter: (value, approve) => approve.approval.toLowerCase().indexOf(value.toLowerCase()) === 0,
    },
    {
      key: "6",
      title: "view task",

      render: (Taskid) => {
        return (
          <>
            <Link to={`../viewTask/${Taskid.taskid}`}>
              <button className='table-btn'>View</button>
            </Link>
          </>
        );
      },
    },
    {
      key: "7",
      title: "Actions",
      render: (record2) => {
        return (
          <>
           
            <DeleteOutlined onClick={() => deleteTask(record2.taskid)} />
            <EditOutlined onClick={() => editTask(record2)} />
          </>
        );
      },
    },
  ];

  return (
    <div className='table'>
      <Link to='/'>
        <button className='back-btn'>Back</button>
      </Link>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}></Table>
      <Modal
     
        title='Edit Task'
        visible={isEditing}
        okText='Save'
        onCancel={() => {
          resetEditing();
        }}
       
        onOk={() => {
         update(editingTask);
         console.log(editingTask)
        
         fetch(`http://localhost:3001/tasks/${editingTask.taskid}`, {
          method: "PATCH",
          body: JSON.stringify({
            taskname: editingTask.taskname,
            taskdescription:editingTask.taskdescription,
            approval:editingTask.approval
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }).then((result) => {
          result.json().then((resp) => {
            console.warn(resp);
            getUser();
          });
        });
        }}
      
        >
        <p>Task Name :</p>
        <Input
          value={editingTask?.taskname}
          onChange={(e) => {
            setEditingTask((pre) => {
              return { ...pre, taskname: e.target.value };
            });
          }}
        />
        <p>Task Description :</p>
        <Input
          value={editingTask?.taskdescription}
          onChange={(e) => {
            setEditingTask((pre) => {
              return { ...pre, taskdescription: e.target.value };
            });
          }}
        />
        <p>Approval :</p>
        <Input
          value={editingTask?.approval}
          onChange={(e) => {
            setEditingTask((pre) => {
              return { ...pre, approval: e.target.value };
            });
          }}
        />
      </Modal>
    </div>
  );
}
