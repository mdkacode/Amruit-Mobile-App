import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../compoents/molecules/Buttons/Button'; // Assuming Button component is exported from Button.tsx

describe('Button Component', () => {
  it('renders correctly with title', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={onPressMock} />
    );
    const buttonElement = getByText('Test Button');
    expect(buttonElement).toBeDefined();
  });

  it('calls onPress function when clicked', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={onPressMock} />
    );
    const buttonElement = getByText('Test Button');
    fireEvent.press(buttonElement);
    expect(onPressMock).toHaveBeenCalled();
  });

  it('renders with custom color and font size', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button
        title="Test Button"
        onPress={onPressMock}
        buttonColor="primary"
        fontColor="white"
        fontSize={20}
      />
    );
    
  });

  it('renders with icon', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Button
        title="Test Button"
        onPress={onPressMock}
        icon="age"
      />
    );
    const iconElement = getByTestId('icon-element'); // Assuming you have a testID for the icon
    expect(iconElement).toBeDefined();
  });

  it('disables button when disabled prop is true', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button
        title="Test Button"
        icon='age'
        onPress={onPressMock}
        disabled={true}
      />
    );
    const buttonElement = getByText('Test Button');
    fireEvent.press(buttonElement);
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
