import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import UserModel from './user.model.js';
import ListingModel from './listing.model.js';
import FavoriteModel from './favorite.model.js';
import MessageModel from './message.model.js';
import AdminLogModel from './adminLog.model.js';
import HomeSliderModel from './home.slider.model.js';
import settingModel from './setting.model.js';

// Initialize models
const HomeSlider = HomeSliderModel(sequelize, DataTypes);
const Setting = settingModel(sequelize, DataTypes);

const User = UserModel(sequelize, DataTypes);
const Listing = ListingModel(sequelize, DataTypes);
const Favorite = FavoriteModel(sequelize, DataTypes);
const Message = MessageModel(sequelize, DataTypes);
const AdminLog = AdminLogModel(sequelize, DataTypes);

// Associations
User.hasMany(Listing, { foreignKey: 'user_id', as: 'listings' });
Listing.belongsTo(User, { foreignKey: 'user_id', as: 'owner' });

User.hasMany(Favorite, { foreignKey: 'user_id', as: 'favorites' });
Favorite.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Listing.hasMany(Favorite, { foreignKey: 'listing_id', as: 'favorites' });
Favorite.belongsTo(Listing, { foreignKey: 'listing_id', as: 'listing' });

Listing.hasMany(Message, { foreignKey: 'listing_id', as: 'messages' });
Message.belongsTo(Listing, { foreignKey: 'listing_id', as: 'listing' });

User.hasMany(Message, { foreignKey: 'from_user_id', as: 'sentMessages' });
User.hasMany(Message, { foreignKey: 'to_user_id', as: 'receivedMessages' });
Message.belongsTo(User, { foreignKey: 'from_user_id', as: 'fromUser' });
Message.belongsTo(User, { foreignKey: 'to_user_id', as: 'toUser' });

User.hasMany(AdminLog, { foreignKey: 'admin_id', as: 'adminLogs' });
AdminLog.belongsTo(User, { foreignKey: 'admin_id', as: 'admin' });

// HomeSlider associations
User.hasMany(HomeSlider, { foreignKey: 'created_by', as: 'homeSliders' });
HomeSlider.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

// Setting associations
User.hasMany(Setting, { foreignKey: 'created_by', as: 'settings' });
Setting.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

export { sequelize, User, Listing, Favorite, Message, AdminLog, HomeSlider, Setting };
export default { sequelize, User, Listing, Favorite, Message, AdminLog, HomeSlider, Setting };