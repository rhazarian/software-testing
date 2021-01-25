package mvc;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import mvc.controller.ToDoListController;
import mvc.model.ToDoTask;
import mvc.service.ToDoService;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class ToDoListControllerTests {
    @Mock
    private ToDoService toDoService;

    private ToDoListController toDoListController;

    @BeforeEach
    void setUp() {
        toDoListController = new ToDoListController(toDoService);
    }

    @Test
    public void addTaskTest() {
        final long listId = 66L;
        final ToDoTask task = new ToDoTask();
        task.setName("Test Task");

        toDoListController.addTask(listId, task);

        verify(toDoService, times(1)).addTask(eq(listId), eq(task));
    }
}
