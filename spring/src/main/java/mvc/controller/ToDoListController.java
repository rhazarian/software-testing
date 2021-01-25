package mvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import mvc.model.ToDoList;
import mvc.model.ToDoTask;
import mvc.service.ToDoService;

@Controller
public class ToDoListController {
    private final ToDoService toDoService;

    public ToDoListController(ToDoService toDoService) {
        this.toDoService = toDoService;
    }

    @RequestMapping(value = "/add-list", method = RequestMethod.POST)
    public String addList(@ModelAttribute("list") ToDoList toDoList) {
        toDoService.addList(toDoList);
        return "redirect:/get-lists";
    }

    @RequestMapping(value = "/remove-list", method = RequestMethod.POST)
    public String removeList(@RequestParam("id") long id) {
        toDoService.removeList(id);
        return "redirect:/get-lists";
    }

    @RequestMapping(value = "/add-task", method = RequestMethod.POST)
    public String addTask(@RequestParam("list-id") long listId, @ModelAttribute("task") ToDoTask toDoTask) {
        toDoService.addTask(listId, toDoTask);
        return "redirect:/get-lists";
    }

    @RequestMapping(value = "/mark-task", method = RequestMethod.POST)
    public String markTask(@RequestParam("id") long id) {
        toDoService.markTask(id);
        return "redirect:/get-lists";
    }

    @RequestMapping(value = "/get-lists", method = RequestMethod.GET)
    public String getLists(ModelMap map) {
        prepareModelMap(map, toDoService.getLists());
        return "index";
    }

    private void prepareModelMap(ModelMap map, List<ToDoList> toDoLists) {
        map.addAttribute("lists", toDoLists);
        map.addAttribute("list", new ToDoList());
        map.addAttribute("task", new ToDoTask());
    }
}
