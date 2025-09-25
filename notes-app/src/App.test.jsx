import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock the global fetch function
global.fetch = vi.fn();

function createFetchResponse(data, ok = true) {
    return { ok, json: () => new Promise((resolve) => resolve(data)) };
}

describe('App Component', () => {

    it('should render the main heading', () => {
        // Arrange: Mock a successful initial fetch
        fetch.mockResolvedValue(createFetchResponse([]));

        // Act: Render the component
        render(<App />);

        // Assert: Check if the heading is on the screen
        expect(screen.getByRole('heading', { name: /Simple Notes App/i })).toBeInTheDocument();
    });

    it('should fetch and display initial notes', async () => {
        // Arrange: Mock notes data
        const mockNotes = [
            { id: 1, text: 'First test note' },
            { id: 2, text: 'Second test note' },
        ];
        fetch.mockResolvedValue(createFetchResponse(mockNotes));

        // Act
        render(<App />);

        // Assert: Wait for the notes to appear on the screen
        await waitFor(() => {
            expect(screen.getByText('First test note')).toBeInTheDocument();
            expect(screen.getByText('Second test note')).toBeInTheDocument();
        });
    });

    it('should allow a user to add a new note', async () => {
        const user = userEvent.setup();
        // Arrange: Mock initial empty notes and a successful post
        fetch.mockResolvedValueOnce(createFetchResponse([])); // Initial GET
        const newNote = { id: 3, text: 'A brand new note' };
        fetch.mockResolvedValueOnce(createFetchResponse(newNote)); // POST response

        render(<App />);

        // Act: Simulate user typing and clicking the add button
        const input = screen.getByPlaceholderText('Add a new note');
        const addButton = screen.getByRole('button', { name: /Add Note/i });

        await user.type(input, newNote.text);
        await user.click(addButton);

        // Assert: Check that the new note appears in the list
        await waitFor(() => {
            expect(screen.getByText(newNote.text)).toBeInTheDocument();
        });

        // Assert: Check if the input field was cleared
        expect(input.value).toBe('');
    });

    it('should display an error message if the initial fetch fails', async () => {
        // Arrange: Mock a failed fetch request
        fetch.mockRejectedValue(new Error('API is down'));

        // Act
        render(<App />);

        // Assert: Wait for the error message to be displayed
        await waitFor(() => {
            expect(screen.getByText('Could not load notes. Is the server running?')).toBeInTheDocument();
        });
    });

});

