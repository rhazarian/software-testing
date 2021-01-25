package mvc;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import mvc.model.ToDoList;
import mvc.model.ToDoTask;
import mvc.repository.ToDoListRepository;
import mvc.repository.ToDoTaskRepository;
import mvc.service.ToDoService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ToDoServiceTests {
    @Mock
    private ToDoListRepository toDoListRepository;
    @Mock
    private ToDoTaskRepository toDoTaskRepository;

    private ToDoService toDoService;

    @BeforeEach
    void setUp() {
        toDoService = new ToDoService(toDoListRepository, toDoTaskRepository);
    }

    @Test
    public void addTaskTest() {
        final ToDoList list = mock(ToDoList.class);
        when(list.getId()).thenReturn(66L);
        final ToDoTask task = new ToDoTask();

        when(toDoListRepository.getOne(eq(list.getId()))).thenReturn(list);
        when(toDoTaskRepository.save(any())).then(i -> i.getArgument(0));

        toDoService.addTask(list.getId(), task);

        assertEquals(task.getList(), list);
        verify(toDoTaskRepository, times(1)).save(eq(task));
    }
}
