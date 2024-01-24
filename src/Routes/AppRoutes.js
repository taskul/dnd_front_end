import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Home from "../Pages/home/Home";
import Login from "../Pages/User/Login";
import Signup from "../Pages/User/SignUp";
import MapBuilder from "../MapBuilder/MapBuilder";
import Dashboard from "../Pages/User/DashboardSideMenu/Dashboard";
import GuildsManager from "../Pages/User/GuildsDashboard/GuildsManager";
import CampaignManager from "../Pages/User/CampaignDashboard/CampaignManager";
import CharacterManager from "../Pages/User/CharacterDashboard/CharacterManager";
import MapManager from "../Pages/User/MapsDashboard/MapManager";
import FriendsManager from "../Pages/User/FriendsDashboard/FriendsManager";
import ChatPage from "../Pages/Game/ChatPage";
import NotFound from "./NotFound";
import Profile from "../Pages/User/Profile";

export default function AppRoutes({ login, signup, mapAssets, setMapAssets, mapName, setMapName }) {

    return (
        <div>
            <Routes>

                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login authenticate={login} />} />
                <Route exact path="/signup" element={<Signup signup={signup} />} />
                <Route exact path="/mapbuilder" element={<MapBuilder
                    mapAssets={mapAssets}
                    setMapAssets={setMapAssets}
                    mapName={mapName}
                    setMapName={setMapName}

                />} />
                {/* In a protected route we define a path that will be checked 
                    then ProtectedRoutes component checks to see if user is logged in
                    if the user is logged in then they  is rendered at /companies route
                    if the user is not logged in then they are redirected to redirectToPath 
                    protected route checks if there is a user logged in, 
                    if there is a logged in user they can proceed to the protected route
                    otherwise they will be redirected to path specified in redirectToPath           
                */}
                {/* Game routes */}
                <Route path="/chat/:chatId/:campaign_name" element={
                    <ProtectedRoutes redirectToPath="/login">
                        <ChatPage
                        />
                    </ProtectedRoutes>
                } />

                {/* User profil*/}
                <Route path="/profile" element={
                    <ProtectedRoutes redirectToPath="/login">
                        <Profile
                        />
                    </ProtectedRoutes>
                } />

                {/* Dashboard routes */}
                <Route path="/dashboard" element={
                    <ProtectedRoutes redirectToPath="/login">
                        <Dashboard />
                    </ProtectedRoutes>
                }>
                    <Route index element={
                        <ProtectedRoutes redirectToPath="/login">
                            <GuildsManager />
                        </ProtectedRoutes>
                    } />
                    <Route path="manage_guilds" index element={
                        <ProtectedRoutes redirectToPath="/login">
                            <GuildsManager />
                        </ProtectedRoutes>
                    } />

                    <Route path="manage_campaigns" element={
                        <ProtectedRoutes redirectToPath="/login">
                            <CampaignManager
                            />
                        </ProtectedRoutes>
                    } />

                    <Route path="manage_characters" element={
                        <ProtectedRoutes redirectToPath="/login">
                            <CharacterManager />
                        </ProtectedRoutes>
                    } />

                    <Route path="manage_maps" element={
                        <ProtectedRoutes redirectToPath="/login">
                            <MapManager />
                        </ProtectedRoutes>
                    } />

                    <Route path="manage_friends" element={
                        <ProtectedRoutes redirectToPath="/login">
                            <FriendsManager />
                        </ProtectedRoutes>
                    } />
                </Route>
                <Route path='/404' element={<NotFound />} />
                <Route path='*' element={<Navigate to="/404" replace />} />
            </Routes>
        </div>
    )
}