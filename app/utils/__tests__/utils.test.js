import { TouchableOpacity, View, Share } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import { ON_SHARE_APP_MESSAGE } from '../constant';
import VTAlert from '../../components/VTAlert/VTAlert';
import {
  IconComponent,
  HeaderLeft,
  onShare,
  AvatarIcon,
  AvatarText,
  renderIconButton,
  formatDate,
  fetchUserDetails,
  fetchEventDetails,
  AlertComponent,
} from '../utils';

// Test for IconComponent
test('IconComponent should render the correct icon', () => {
  const icon = IconComponent('FontAwesome', 'star', 20, 'red');
  expect(icon.props.name).toBe('star');
  expect(icon.props.size).toBe(20);
  expect(icon.props.color).toBe('red');
});

// Test for HeaderLeft
test('HeaderLeft should render the correct component', () => {
  const action = jest.fn();
  const headerLeft = HeaderLeft(action, 'FontAwesome', 'star', 20, 'red');
  expect(headerLeft.type).toBe(View);
  expect(headerLeft.props.style).toEqual({ marginLeft: 15, marginRight: 15 });
  expect(headerLeft.props.children.type).toBe(TouchableOpacity);
  expect(headerLeft.props.children.props.onPress).toBe(action);
  expect(headerLeft.props.children.props.children.props.name).toBe('star');
  expect(headerLeft.props.children.props.children.props.size).toBe(20);
  expect(headerLeft.props.children.props.children.props.color).toBe('red');
});

// Test for onShare
test('onShare should call Share.share with the correct message', async () => {
  Share.share = jest.fn();
  await onShare();
  expect(Share.share).toHaveBeenCalledWith({ message: ON_SHARE_APP_MESSAGE });
});

// Test for AvatarIcon
test('AvatarIcon should render the correct icon', () => {
  const icon = AvatarIcon('star', { size: 20, color: 'red' });
  expect(icon.props.icon).toBe('star');
  expect(icon.props.size).toBe(20);
  expect(icon.props.color).toBe('red');
});

// Test for AvatarText
test('AvatarText should render the correct component', () => {
  const avatarText = AvatarText({ size: 20, color: 'red' });
  expect(avatarText.type).toBe(Avatar.Text);
  expect(avatarText.props.size).toBe(20);
  expect(avatarText.props.color).toBe('red');
});

// Test for renderIconButton
test('renderIconButton should render the correct component', () => {
  const buttonProps = { icon: 'star', size: 20, color: 'red' };
  const iconButton = renderIconButton(buttonProps);
  expect(iconButton.type).toBe(IconButton);
  expect(iconButton.props.icon).toBe('star');
  expect(iconButton.props.size).toBe(20);
  expect(iconButton.props.color).toBe('red');
});

// Test for formatDate
test('formatDate should return the correct formatted date', () => {
  const date = new Date('2022-01-01');
  const formattedDate = formatDate(date);
  expect(formattedDate).toBe('1 January 2022');
});

// Test for fetchUserDetails
test('fetchUserDetails should return the correct user details', () => {
  const userDetails = fetchUserDetails();
  expect(userDetails).toEqual({
    name: 'Pankaj Saini',
    email: 'abc@xyz.com',
    address: 'abcabcabcabc',
    contact: '1231231234',
  });
});

// Test for fetchEventDetails
test('fetchEventDetails should return the correct event details', () => {
  const eventDetails = fetchEventDetails();
  expect(eventDetails).toEqual({
    id: '',
    name: '',
    address: '',
    date: '',
    guests: [],
  });
});

// Test for AlertComponent
test('AlertComponent should render the correct component when error is not null', () => {
  const error = 'Something went wrong';
  const alertComponent = AlertComponent(error);
  expect(alertComponent.type).toBe(VTAlert);
  expect(alertComponent.props.isVisible).toBe(true);
  expect(alertComponent.props.body).toBe(error);
});
