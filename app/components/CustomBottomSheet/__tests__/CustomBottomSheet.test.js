import React from 'react';
import { Text, Dimensions } from 'react-native';
import { render } from '@testing-library/react-native';
import CustomBottomSheet from '../CustomBottomSheet';

describe('CustomBottomSheet', () => {
  it('renders the content correctly', () => {
    const content = <Text>Test Content</Text>;
    const { getByText } = render(<CustomBottomSheet content={content} />);
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('renders the bottom sheet with correct height', () => {
    const content = <Text>Test Content</Text>;
    const { getByTestId } = render(<CustomBottomSheet content={content} />);
    const bottomSheet = getByTestId('bottomSheet');
    expect(bottomSheet.props.style[1].height).toBe(Dimensions.get('window').height * 0.75);
  });
});
