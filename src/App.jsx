import { ConfigProvider, Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

import { Navbar, Player } from './components';
import {
  Home,
  ChartHome,
  Top100,
  MV,
  DetailPlaylist,
  DetailMV,
  Search,
  Artist,
} from './pages';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Barlow',
        },
      }}
    >
      <Layout>
        <Header className="header">
          <Navbar />
        </Header>
        <Content className="content">
          <div className="container content__container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/zingchart" element={<ChartHome />} />
              <Route path="/top100" element={<Top100 />} />
              <Route path="/mv" element={<MV />} />
              <Route
                path="/playlist/:playlistId"
                element={<DetailPlaylist />}
              />
              <Route path="/mv/:mvId" element={<DetailMV />} />
              <Route path="/search/:keyword" element={<Search />} />
              <Route path="/artist/:artistName" element={<Artist />} />
            </Routes>
          </div>
        </Content>
        <Footer className="footer">
          <Player />
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
