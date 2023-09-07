/* eslint-disable */
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Minesweeper from '../../components/Minesweeper.jsx'
import App from '../../App.jsx'

const rightClickTile = (rowIndex, columnIndex) => {
  const coordinate = `${rowIndex-1}-${columnIndex-1}`
  const cell = screen.getByTestId(coordinate + ' tile')
  fireEvent.contextMenu(cell)
}

const leftClickTile = (rowIndex, columnIndex) => {
  const coordinate = `${rowIndex-1}-${columnIndex-1}`
  const cell = screen.getByTestId(coordinate + ' tile')
  fireEvent.click(cell)
}

const loadMockData = async (mockData) => {  
  const textarea = screen.getByTestId("mockData-text");
  const submitButton = screen.getByTestId("mockData-submit");

  fireEvent.change(textarea, { target: { value: mockData } });
  fireEvent.click(submitButton);
  await waitFor(() => expect(textarea.value).toBe(mockData));
}

const tagAsInconclusive = async (rowIndex, columnIndex) => {
  const coordinate = `${rowIndex-1}-${columnIndex-1}`
  const cell = screen.getByTestId(coordinate + ' tile')
  rightClickTile(rowIndex, columnIndex)
  await waitFor(() => fireEvent.contextMenu(cell))
  
}

export const basicFormSteps = ({
    given: Given,
    and : And,
    when: When,
    then: Then
}) => {

  let game

    Given("the player opens the game", () => {
      game = render(<Minesweeper/>)
    })

}