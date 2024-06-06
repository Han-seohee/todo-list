import {useEffect, useState} from "react";

function FilterTab({todos, setFilterTodos}) {
  const TABS = ['All', 'Doing', 'Done'];
  const [activeTab, setActiveTab] = useState('All');
  const [indicatorStyle, setIndicatorStyle] = useState({});

  useEffect(() => {
    updateIndicatorStyle();

    // resize 이벤트를 사용하여 창 크기 변경을 감지하고, indicatorStyle을 업데이트
    window.addEventListener('resize', updateIndicatorStyle);

    // 컴포넌트가 언마운트시 리스너 제거
    return () => {
      window.removeEventListener('resize', updateIndicatorStyle);
    };
  }, [activeTab]); // activeTab 또는 TABS가 변경될 때마다 실행

  const updateIndicatorStyle = () => {
    const tabContainerWidth = document.querySelector('.tab_list').offsetWidth;
    const tabWidth = tabContainerWidth / TABS.length; // 각 탭의 너비 계산
    const idx = TABS.indexOf(activeTab); // activeTab의 인덱스 가져오기
    const leftPosition = idx * tabWidth; // 클릭한 탭의 위치 계산

    setIndicatorStyle({
      transform: `translateX(${leftPosition}px)`,
      width: `${tabWidth}px`
    });
  };

  const filterTab = (tab, todos) => {
    if(tab === 'Doing') {
      return todos.filter(item => !item.checked);
    } else if (tab === 'Done') {
      return todos.filter(item => item.checked);
    }
    return todos;
  }

  const onTab = (tab) => {const filtered = filterTab(tab, todos);
    setFilterTodos(filtered);
    setActiveTab(tab);
  }

  return (
    <div className="tab_container">
    <ul className="tab_list">
      {
        TABS.map((tab, idx) => {
          return (
            <li
              key={idx}
              onClick={() => onTab(tab, idx)}
              className={activeTab === tab ? 'active' : ''}
            >{tab}</li>
          )
        })
      }
    </ul>
  <div className="tab_indicator" style={indicatorStyle}></div>
  </div>
  )
}

export default FilterTab;