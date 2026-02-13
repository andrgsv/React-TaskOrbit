import { motion, AnimatePresence } from "framer-motion";
import { TaskItem } from "./TaskItem";

// плавное появление и удаление элементов
export const TaskList = ({ tasks }) => (
  <AnimatePresence>
    {tasks.map((task) => (
      <motion.div
        key={task.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="mb-4"
      >
        <TaskItem task={task} />
      </motion.div>
    ))}
  </AnimatePresence>
);





