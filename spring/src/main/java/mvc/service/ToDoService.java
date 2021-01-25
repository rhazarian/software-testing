package mvc.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import mvc.repository.ToDoListRepository;
import mvc.model.ToDoList;
import mvc.model.ToDoTask;
import mvc.repository.ToDoTaskRepository;

@Service
@Transactional
public class ToDoService {
    private final ToDoListRepository toDoListRepository;
    private final ToDoTaskRepository toDoTaskRepository;

    public ToDoService(ToDoListRepository toDoListRepository, ToDoTaskRepository toDoTaskRepository) {
        this.toDoListRepository = toDoListRepository;
        this.toDoTaskRepository = toDoTaskRepository;
    }

    public void addList(ToDoList toDoList) {
        toDoListRepository.save(toDoList);
    }

    public void removeList(long id) {
        toDoListRepository.delete(toDoListRepository.getOne(id));
    }

    public void addTask(long listId, ToDoTask toDoTask) {
        toDoTask.setList(toDoListRepository.getOne(listId));
        toDoTaskRepository.save(toDoTask);
    }

    public void markTask(long id) {
        final ToDoTask task = toDoTaskRepository.getOne(id);
        task.setDone(true);
        toDoTaskRepository.save(task);
    }

    public List<ToDoList> getLists() {
        return toDoListRepository.findAll();
    }
}
