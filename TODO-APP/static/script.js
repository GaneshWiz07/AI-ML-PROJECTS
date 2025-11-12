// Global variables
let currentFilter = 'all';
let editingTodoId = null;

// DOM Elements
const addForm = document.getElementById('add-todo-form');
const filterBtns = document.querySelectorAll('.filter-btn');
const todoItems = document.querySelectorAll('.todo-item');
const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-form');
const editTitle = document.getElementById('edit-title');
const editDescription = document.getElementById('edit-description');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateStats();
    applyFilter('all');
});

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            setActiveFilter(this);
            applyFilter(filter);
        });
    });

    // Edit form submission
    editForm.addEventListener('submit', function(e) {
        e.preventDefault();
        submitEditForm();
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === editModal) {
            closeEditModal();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // ESC to close modal
        if (e.key === 'Escape' && editModal.style.display === 'block') {
            closeEditModal();
        }

        // Ctrl/Cmd + Enter to add todo
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const titleInput = document.getElementById('title');
            if (titleInput.value.trim()) {
                addForm.submit();
            }
        }
    });
}

// Set active filter button
function setActiveFilter(activeBtn) {
    filterBtns.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

// Apply filter to todos
function applyFilter(filter) {
    currentFilter = filter;
    const todoItems = document.querySelectorAll('.todo-item');

    todoItems.forEach(item => {
        const isCompleted = item.classList.contains('completed');
        let shouldShow = true;

        switch(filter) {
            case 'pending':
                shouldShow = !isCompleted;
                break;
            case 'completed':
                shouldShow = isCompleted;
                break;
            case 'all':
            default:
                shouldShow = true;
                break;
        }

        if (shouldShow) {
            item.classList.remove('hidden');
            item.style.display = 'flex';
        } else {
            item.classList.add('hidden');
            item.style.display = 'none';
        }
    });

    // Show empty state if no visible items
    updateEmptyState();
}

// Update empty state
function updateEmptyState() {
    const todoList = document.querySelector('.todo-list');
    const visibleItems = document.querySelectorAll('.todo-item:not(.hidden)');
    const existingEmptyState = document.querySelector('.empty-state');

    if (visibleItems.length === 0 && !existingEmptyState) {
        let message = '';
        switch(currentFilter) {
            case 'pending':
                message = 'No pending todos! Great job!';
                break;
            case 'completed':
                message = 'No completed todos yet.';
                break;
            default:
                message = 'No todos yet! Add your first todo above.';
        }

        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <i class="fas fa-clipboard-list"></i>
            <h3>All done!</h3>
            <p>${message}</p>
        `;
        todoList.appendChild(emptyState);
    } else if (visibleItems.length > 0 && existingEmptyState) {
        existingEmptyState.remove();
    }
}

// Toggle todo completion
function toggleTodo(todoId) {
    const todoItem = document.querySelector(`[data-id="${todoId}"]`);
    const checkbox = document.querySelector(`#todo-${todoId}`);

    // Add loading state
    checkbox.disabled = true;

    // Make API request
    fetch(`/toggle/${todoId}`)
        .then(response => {
            if (response.ok) {
                // Toggle visual state
                todoItem.classList.toggle('completed');
                updateStats();
                applyFilter(currentFilter);
            }
        })
        .catch(error => {
            console.error('Error toggling todo:', error);
            // Revert checkbox state on error
            checkbox.checked = !checkbox.checked;
        })
        .finally(() => {
            checkbox.disabled = false;
        });
}

// Delete todo with confirmation
function deleteTodo(todoId) {
    const todoItem = document.querySelector(`[data-id="${todoId}"]`);
    const todoTitle = todoItem.querySelector('.todo-title').textContent;

    if (confirm(`Are you sure you want to delete "${todoTitle}"?`)) {
        // Add loading state
        todoItem.style.opacity = '0.5';
        todoItem.style.pointerEvents = 'none';

        fetch(`/delete/${todoId}`)
            .then(response => {
                if (response.ok) {
                    // Animate removal
                    todoItem.style.transform = 'translateX(100%)';
                    setTimeout(() => {
                        todoItem.remove();
                        updateStats();
                        applyFilter(currentFilter);
                    }, 300);
                } else {
                    throw new Error('Failed to delete todo');
                }
            })
            .catch(error => {
                console.error('Error deleting todo:', error);
                // Restore item state on error
                todoItem.style.opacity = '1';
                todoItem.style.pointerEvents = 'auto';
                alert('Failed to delete todo. Please try again.');
            });
    }
}

// Open edit modal
function editTodo(todoId, title, description) {
    editingTodoId = todoId;
    editTitle.value = title;
    editDescription.value = description || '';

    // Set form action
    editForm.action = `/edit/${todoId}`;

    // Show modal
    editModal.style.display = 'block';
    editTitle.focus();
}

// Close edit modal
function closeEditModal() {
    editModal.style.display = 'none';
    editingTodoId = null;
    editForm.reset();
}

// Submit edit form
function submitEditForm() {
    const formData = new FormData(editForm);
    const todoId = editingTodoId;

    if (!formData.get('title').trim()) {
        alert('Title is required');
        return;
    }

    // Disable form during submission
    const submitBtn = editForm.querySelector('.btn-save');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading"></div> Saving...';
    submitBtn.disabled = true;

    fetch(`/edit/${todoId}`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            // Reload page to show updated todo
            window.location.reload();
        } else {
            throw new Error('Failed to update todo');
        }
    })
    .catch(error => {
        console.error('Error updating todo:', error);
        alert('Failed to update todo. Please try again.');
    })
    .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// Update statistics
function updateStats() {
    const totalCount = document.getElementById('total-count');
    const pendingCount = document.getElementById('pending-count');
    const completedCount = document.getElementById('completed-count');

    const allTodos = document.querySelectorAll('.todo-item');
    const completedTodos = document.querySelectorAll('.todo-item.completed');
    const pendingTodos = allTodos.length - completedTodos.length;

    if (totalCount) totalCount.textContent = allTodos.length;
    if (pendingCount) pendingCount.textContent = pendingTodos;
    if (completedCount) completedCount.textContent = completedTodos.length;
}

// Auto-resize textarea
function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

// Add auto-resize to textareas
document.addEventListener('DOMContentLoaded', function() {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            autoResize(this);
        });
    });
});

// Smooth scroll to top when adding new todo
addForm.addEventListener('submit', function() {
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
});

// Add fade-in animation for new todos
function animateNewTodos() {
    const todoItems = document.querySelectorAll('.todo-item');
    todoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Search functionality (bonus feature)
function addSearchFeature() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search todos...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        width: 100%;
        padding: 15px;
        border: 2px solid #e2e8f0;
        border-radius: 10px;
        font-size: 1rem;
        margin-bottom: 20px;
        transition: all 0.3s ease;
    `;

    // Insert search input before filter section
    const filterSection = document.querySelector('.filter-section');
    filterSection.parentNode.insertBefore(searchInput, filterSection);

    // Add search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const todoItems = document.querySelectorAll('.todo-item');

        todoItems.forEach(item => {
            const title = item.querySelector('.todo-title').textContent.toLowerCase();
            const description = item.querySelector('.todo-description')?.textContent.toLowerCase() || '';

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Initialize search feature
// addSearchFeature(); // Uncomment to enable search

// Keyboard shortcuts help
function showKeyboardShortcuts() {
    const shortcuts = [
        'Ctrl/Cmd + Enter: Quick add todo',
        'Esc: Close modal',
        'Tab: Navigate between fields'
    ];

    console.log('Keyboard Shortcuts:', shortcuts.join('\n'));
}

// Show shortcuts on first load
setTimeout(showKeyboardShortcuts, 2000);