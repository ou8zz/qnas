import React, { useState } from 'react';
import { useLocation, Outlet, history, request, useRequest } from 'umi';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { ConfigProvider, Dropdown, FloatButton, Table } from 'antd';
// import zhCN from 'antd/lib/locale-provider/zh_CN';
import { getItemList } from '@/service/api';

const IndexLayout = () => {
  let location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);
  const [path, setPath] = useState('/');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const { data, loading } = useRequest(() => {
    return getItemList(path);
  });

  console.log("data:", loading, data);

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (name) => {
        return <a onClick={()=>setSelectedRowKeys([])}>{name}</a>
      }
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
      render: (size, item) => {
        if(item.isDir) {
          return '';
        }
        if (size > 1000000000) {
          return (size / 1000000000).toFixed(2) + ' GB'
        } else if (size > 1000000) {
          return (size / 1000000).toFixed(2) + ' MB'
        } else if (size > 1000) {
          return (size / 1000).toFixed(2) + ' KB'
        } else {
          return 0 + ' KB'
        }
      }
    },
    {
      title: '修改日期',
      dataIndex: 'modTime',
      key: 'modTime',
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      console.log('selectedRowKeys changed: ', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <>
      <ProLayout
        title={"QNAS"}
        siderWidth={300}
        loading={loading}
        route={{ routes: menusToRoutes(data) }}
        location={{ pathname, }}
        menuItemRender={(item, dom) => (
          <div onClick={() => { setPathname(item.path || '/'); history.push(item.path); }} >
            {dom}
          </div>
        )}
      >
        <PageContainer>
          <Table size="small" rowSelection={rowSelection} dataSource={data} columns={columns} pagination={{ pageSize: 100 }} />;
          <FloatButton.BackTop visibilityHeight={500} />
        </PageContainer>
      </ProLayout >
    </>
  );
};

const menusToRoutes = (data) => {
  // const routes = []; //_.map(menus, item => ({ path: item.link, name: item.title, routes: menusToRoutes(item.children) }))
  // return routes;
  return data && data.map((item, index) => {
    if (item.isDir) return { path: '/', name: item.name, routes: [] }
  });
}

export default IndexLayout;